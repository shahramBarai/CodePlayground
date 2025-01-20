<script>
    import { userUuid, orderNumber, assignments } from "../stores/stores.js";
</script>

<div class="mb-4">
    <h4 class="text-2xl font-bold dark:text-black">Assignment {$orderNumber + 1}: {assignments[$orderNumber].title}</h4>
    <p>{assignments[$orderNumber].handout}</p>
</div>