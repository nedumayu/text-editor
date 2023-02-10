<template>
  <div class="navbar">
    <div @click="$router.push('/')"  class="logo">
      Text Editor
    </div>
    <div class="navbar-buttons">
      <Button @click="$router.push('/boards')" class="menu-item">
        Boards
      </Button>
      <Button @click="$router.push('/profile')" class="menu-item">
        Profile
      </Button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 60px;
  box-shadow: 2px 0 5px 2px #c2c2c2;
  display: flex;
  text-transform: uppercase;
  padding: 0 30px;
  margin-bottom: 30px;
  align-items: center;
}

.navbar-buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.menu-item {
  margin-right: 20px;
  font-size: 14px;
}

.logo {
  font-weight: bold;
  margin-right: 20px;
  width: 130px;
}

.logo:hover {
  opacity: 0.7;
}

</style>
