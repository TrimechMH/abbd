<template>
  <!-- Breadcrumbs Area Start -->
  <div class="breadcrumbs-area">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="breadcrumbs">
            <h2>ABBD</h2>
            <ul class="breadcrumbs-list">
              <li>
                <router-link
                  class="cursor"
                  :to="{ name: 'catalogue' }"
                  title="Return to Home"
                  >Home
                </router-link>
              </li>
              <li>ABBD</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Breadcrumbs Area Start -->
</template>

<script>
export default {
  name: "breadcrumbsComponent"
};
</script>

<style scoped></style>
