<template>
<div>
    <div class="promotionImage" v-for="image in Images" :key="image['_id']">
        <img class="image" :src="image.image.secure_url" :alt="image.name">
    </div>
</div>
    
</template>

<script>
import Api from '@/config/Api'
export default {
    name:'promotionImage',
    data(){
        return{
            Images:{}
        }
    },
    created(){
        Api().get("/promotionImage")
        .then(response => {
            this.Images = response.data
        })
    }
}
</script>

<style>
.promotionImage{
    text-align: center;
}

</style>
