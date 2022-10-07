<template>
<div class="no-data">
    <img src="@/assets/ui/暂无数据icon@2x.png" alt="">
    <p>暂无数据</p>
</div>
</template>

<script>
export default {


}
</script>

<style>
.no-data{
    display: flex;
    flex-direction:column ;
    align-items: center;
    justify-content: center;
    min-height: 550px;
}
.no-data>img{
    max-width: 288px;
    /* max-height: 288px; */
}

</style>