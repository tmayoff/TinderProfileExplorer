<script lang="ts">
  import { text } from "svelte/internal";
  import Profile from "./Profile.svelte";

  let files: FileList;
  let dataFile: File;
  $: if (files) dataFile = files.item(0);
</script>

<main>
  {#if !dataFile}
    <div class="container">
      <h1 class="is-size-2">Welcome to Tinder Profile Explorer</h1>
      <p class="is-size-5">
        A place where you can gain some interesting insights into you Tinder
        dating life.
      </p>
      <p class="is-size-7">
        P.S. I in no way take responsibility if your data get leaked somewhere
      </p>

      <div class="card m-5">
        <div class="card-header">
          <div class="card-header-title">
            Upload your data.json from <a
              href="https://www.help.tinder.com/hc/en-us/articles/115005626726-How-do-I-request-a-copy-of-my-personal-data-"
              >here</a
            >
          </div>
        </div>
        <div class="card-content">
          <div class="field">
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" bind:files />
                <div class="file-cta">
                  <span class="file-icon">
                    <ion-icon name="cloud-upload" />
                  </span>
                  <span class="file-label">Choose a data.json file</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    {#await dataFile.text() then data}
      <Profile {data} />
    {/await}
  {/if}
</main>

<style>
</style>
