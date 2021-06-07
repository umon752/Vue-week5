export default {
    props: ['productsData', 'thousands'],
    template: `<ul class="row">
    <li class="col-6 col-md-4 col-lg-3 mb-4" v-for="item in productsData">
    <a href="#" class="productImg d-block overflow-hidden">
    <img :src="item.imageUrl" class="productImg--bigger">
    </a>
    <div class="d-lg-flex mb-2">
    <a href="#" class="btn btn-outline-primary-dark w-100 rounded-0 fs-7 fs-lg-6" @click.prevent="$emit('viewProduct',item)">查看商品</a>
    <a href="#" class="btn btn-primary text-white w-100 rounded-0 fs-7 fs-lg-6" @click.prevent="$emit('addCart',item.id, item.qty)">加入購物車</a>
    </div>
    <h4 class="h6 mb-md-2"><a href="#" class="text-dark">{{ item.title }}</a></h4>
    <del>NT$ {{ thousands(item.origin_price) }}</del>
    <h5 class="h5 text-primary-dark fw-bold">NT$ {{ thousands(item.price) }}</h5>
    </li></ul>`
};