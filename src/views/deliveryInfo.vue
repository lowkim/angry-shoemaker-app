<template>
  <div class="deliveryInfo">
    <div class="container">
      <h2>Delivery Info</h2>
      <p>Orders can be self-collected or delivered to any locations in Singapore, EXCEPT restricted areas such as Army Camps, Cargo Zones, Jurong Island, etc.</p>

      <h2>Self Collection</h2>
      <p>Please select “Self-Collection” in the drop down box at checkout.</p>
      <p>Self-Collection Address:
        <br>31 Sin Ming Drive #01-299
        <br>Singapore 575705
      </p>

      <h2>Delivery Charges</h2>Delivery schedules of our Elves are as follow:
      <ul>
        <li>Office Elf (10am – 6pm) : $8
          <br>Payment to be done and confirmed before 1pm
        </li>
        <li>Hi-Tea Elf (2pm-7pm) : $8
          <br>Payment to be done and confirmed before 3pm
        </li>
        <li>Dinner Elf (5pm – 10pm) : $8
          <br>Payment to be done and confirmed before 6pm
        </li>

        <li>Nocturnal Elf (10pm – 1am) : $20
          <br>Payment to be done and confirmed before 6pm
        </li>
        
        <li>For purchases above $60, you are entitled to free delivery between 11am – 7pm.</li>
      </ul>

      <h5>An additional charge of $10 will be imposed if the following occurs that requires re-delivery:</h5>
      <ol>
        <li>Recipient is not present at the given address given as per the chosen delivery time slot. And/or, nobody is willing to collect on behalf.</li>
        <li>Incorrect address submitted during checkout.</li>
        <li>No such recipient at given delivery address</li>
        <li>Recipient did not pick up the calls/texts, hence unable to deliver.</li>
      </ol>Re-delivery have to be arranged for the next day.
      <br>Alternatively, you may opt for self-collection, to be arranged 1 day in advance. Text us at 8768 8832 to confirm.
      <br>For more information regarding delivery, please refer to our FAQs here
    </div>
  </div>
</template>

<script>
export default {
  name: "deliveryInfo"
};
</script>

<style>
.deliveryInfo {
  font-family: "Krub", sans-serif;
}
.deliveryInfo h2 {
  text-decoration: none;
}


</style>
