<template>
<div>
    <div class="title">
        <h1 style="text-align:center">{{subcategory}}</h1>
    </div>
    <Cards :products="products"/>

</div>
</template>

<script>
import Cards from './Cards';
import Api from '@/config/Api';
export default {
    name:'category',
    props:['category','subcategory'],
    data(){
        return {
            products: []
        }
    },
    created(){
        this.fetch();
    },
    components:{
        Cards
    },
    watch:{
        '$route'(to, from){
            if(from.params.subcategory !== to.params.subcategory){
                this.fetch()
            }
        }
    },
    methods:{
        fetch(){
            Api().get(`/categories/${this.category}/${this.subcategory}`)
            .then(response => {
                this.products = response.data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
