<script>
  import { userUuid, currentScore } from "../stores/stores.js";
</script>

<nav class="p-4 mb-4 shadow flex flex-row gap-6 place-content-between">
  <div class="place-items-start">
    <span class="text-1xl text-gray-700 font-serif">Hello {$userUuid}!</span>
  </div>
  <div class="">
    SCORE: <pan class="font-bold">{$currentScore}</pan>
  </div>
  
</nav>
