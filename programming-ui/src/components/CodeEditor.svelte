<script>
    import { userUuid, orderNumber, assignments, setNewAssignementOrder, currentOrder } from "../stores/stores.js";
    
    // let text = `def hello():
    //     return "Hello"`;

    let text = "";
    let erroMessage = "";

    let result = "";
    let timerID = "";
    let assignment_submission = "";

    const checkAssignmetStatus = async () => {
        const response = await fetch(`/api/assignment/status/${assignment_submission.id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            }
        });

        const jsonData = await response.json();
        assignment_submission = jsonData.result;
        if (assignment_submission.status === "processed") {
            if (assignment_submission.correct) {
                setNewAssignementOrder($orderNumber + 1);
            }
            result = assignment_submission.grader_feedback;
            clearInterval(timerID);
            timerID = "";
            erroMessage = "";
        }
    };

    const submitAssignment = async () => {
        if (text === "") {
            erroMessage = "You cannot submit an empty field!";
            return;
        }

        const data = {
            userUuid: $userUuid,
            assignment_id: assignments[$orderNumber].id,
            code: text,
        };

        const response = await fetch(`/api/assignment/submit`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const jsonData = await response.json();
        if (jsonData.error) {
            erroMessage = jsonData.error;
        } else {
            if (timerID !== "") { 
                clearInterval(timerID); 
                timerID = "";
            }
            result = "";

            assignment_submission = jsonData.result;
            if (timerID === "") {
                timerID = setInterval(() => checkAssignmetStatus(), 1000);
            }
        }
        
    };
    const getPreviousAssignment = async () => {
        if ($orderNumber - 1 < 0) return;
        $orderNumber = $orderNumber - 1;
        result = "";
        text = "";
        erroMessage = "";
    }
    const getNextAssignment = async () => {
        if ($orderNumber + 1 >= assignments.length) return;
        if ($orderNumber + 1 > currentOrder) return;
        $orderNumber = $orderNumber + 1;
        result = "";
        text = "";
        erroMessage = "";
    }
</script>

<div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <textarea bind:value={text} rows="5" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder=" Write your code here..." required ></textarea>
    </div>
    <div class="flex flex-row items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <div class="flex basis-1/6 place-content-start">
            {#if $orderNumber !== 0}
                <button type="button" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                on:click={getPreviousAssignment}>
                    Previous
                </button>
            {/if}
        </div>
        <div class="flex basis-4/6 place-content-center">
            <button type="button" class="inline-flex py-2.5 px-20 text-xl font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            on:click={submitAssignment}>
                Submit
            </button>
        </div>
        <div class="flex basis-1/6 place-content-end">
            {#if $orderNumber < assignments.length-1}
                {#if $orderNumber < currentOrder}
                    <button type="button" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    on:click={getNextAssignment}>
                        Next
                    </button>
                {:else if $orderNumber === currentOrder}
                    <button type="button" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-gray-600 rounded-lg focus:ring-4" disabled>
                        Next
                    </button>
                {/if}
            {/if}
        </div>
    </div>
</div>

{#if erroMessage !== ""}
<div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Info</span>
    <div>
        <span class="font-medium"></span> {erroMessage}
    </div>
</div>
{/if}

<h4 class="text-2xl font-bold dark:text-black ">Result</h4>
<div class="p-4 mb-2 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
    {#if assignment_submission.grader_feedback}
        {#each result.split("\n") as r}
            <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">{r}</p>
        {/each}
    {/if}
    {#if timerID !== ""}
        <div class="text-center">
            <div role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>    
    {/if}
</div>