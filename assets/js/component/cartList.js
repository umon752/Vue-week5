export default {
    props: ['cartsData', 'thousands'],
    emits: ['updateCart', 'delCart'],
    template: `<div class="row d-none d-md-flex mb-3">
    <div class="col-md-4 col-lg-3">品項</div>
    <div class="col-md-2 col-lg-3">單價</div>
    <div class="col-md-2 col-lg-3">數量</div>
    <div class="col-md-4 col-lg-3">金額</div>
</div>
<ul class="row align-items-center border-bottom pb-3 mb-3" v-for="item in cartsData.carts">
    <li class="col-md-4 col-lg-3 d-flex flex-column flex-md-row align-items-md-center">
        <img :src="item.product.imageUrl" class="cartImg mb-2 mr-md-3">
        <h4 class="h6 ms-md-3"><span class="d-md-none">品名：</span>{{ item.product.title }}</h4>
    </li>
    <li class="col-md-2 col-lg-3">
        <h5 class="h6"><span class="d-md-none">單價：</span>NT$ {{ thousands(item.product.price) }}</h5>
    </li>
    <li class="col-md-2 col-lg-3">
        <div><span class="d-md-none">數量：</span>
        <input type="number" class="form-control rounded-0" min="1" @change="$emit('updateCart',item)" v-model.number="item.qty"></div>
    </li>
    <li class="col-md-4 col-lg-3 d-flex align-items-center justify-content-between">
        <h5 class="h6"><span class="d-md-none">金額：</span>NT$ {{ thousands(item.final_total) }}</h5>
        <a href="#" class="material-icons text-dark" @click.prevent="$emit('delCart',item.id)">
            close
        </a>
    </li>
</ul>`
};

