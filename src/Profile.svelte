<script lang="ts">
  import moment from "moment";

  export let data: string;

  let profile_details = JSON.parse(data);

  let daysSinceAccountCreated =
    Date.now() - Date.parse(profile_details.User.create_date);
  daysSinceAccountCreated = Math.ceil(
    daysSinceAccountCreated / (1000 * 60 * 60 * 24)
  );

  let appOpens = 0;
  for (let item in profile_details.Usage.app_opens) {
    appOpens += profile_details.Usage.app_opens[item];
  }

  // Liked
  let liked = 0;
  for (let item in profile_details.Usage.swipes_likes) {
    liked += profile_details.Usage.swipes_likes[item];
  }

  // Passed
  let passed = 0;
  for (let item in profile_details.Usage.swipes_passes) {
    passed += profile_details.Usage.swipes_passes[item];
  }

  let totalSeen = liked + passed;

  // Matches
  let matches = 0;
  for (let item in profile_details.Usage.matches) {
    matches += profile_details.Usage.matches[item];
  }

  // Messages sent
  let msgSent = 0;
  for (let item in profile_details.Usage.messages_sent) {
    msgSent += profile_details.Usage.messages_sent[item];
  }

  // Messages received
  let msgRecv = 0;
  for (let item in profile_details.Usage.messages_received) {
    msgRecv += profile_details.Usage.messages_received[item];
  }
</script>

<div class="container is-flex">
  <table class="table is-hoverable is-bordered m-3">
    <thead class="thead">
      <tr class="tr is-selected">
        <td colspan="2">User Info {profile_details.User.name}</td>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr class="tr">
        <td class="td">Phone Number</td>
        <td class="td">{profile_details.User.phone_id}</td>
      </tr>
      <tr class="tr">
        <td class="td">Email</td>
        <td class="td">{profile_details.User.email}</td>
      </tr>
      <tr class="tr">
        <td class="td">Bio</td>
        <td class="td">{profile_details.User.bio}</td>
      </tr>
      <tr class="tr">
        <td class="td">Education</td>
        <td class="td">{profile_details.User.education}</td>
      </tr>
      <tr class="tr">
        <td class="td">Birthday</td>
        <td class="td"
          >{moment(profile_details.User.birth_date).format("DD-MM-YYYY")}</td
        >
      </tr>
      <tr class="tr">
        <td class="td">Account Created</td>
        <td class="td"
          >{moment(profile_details.User.create_date).format("DD-MM-YYYY")}</td
        >
      </tr>
      <tr class="tr">
        <td class="td">Days since account created</td>
        <td class="td">{daysSinceAccountCreated}</td>
      </tr>
      <tr class="tr">
        <td class="td">Age Range</td>
        <td class="td"
          >{profile_details.User.age_filter_min} - {profile_details.User
            .age_filter_max}
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table is-hoverable is-bordered m-3">
    <thead class="thead">
      <tr class="tr is-selected">
        <td class="td" colspan="2">Usage Info {profile_details.User.name}</td>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr class="tr">
        <td class="td">Times you opened the app</td>
        <td class="td">{appOpens}</td>
      </tr>
      <tr class="tr">
        <td class="td">Likes you sent</td>
        <td class="td">{liked}</td>
      </tr>
      <tr class="tr">
        <td class="td">Dislikes you sent</td>
        <td class="td">{passed}</td>
      </tr>
      <tr class="tr">
        <td class="td">Number of profiles seen</td>
        <td class="td">{totalSeen}</td>
      </tr>
      <tr class="tr">
        <td class="td">Percentage of profiles liked</td>
        <td class="td">{((liked / totalSeen) * 100).toFixed(2)}%</td>
      </tr>
      <tr class="tr">
        <td class="td">Total Matches</td>
        <td class="td">{matches}</td>
      </tr>
      <tr class="tr">
        <td class="td">Messages Sent</td>
        <td class="td">{msgSent}</td>
      </tr>
      <tr class="tr">
        <td class="td">Messages Received</td>
        <td class="td">{msgRecv}</td>
      </tr>
    </tbody>
  </table>
</div>
