export default {
    data() {
        return {
            // 初始化 modal 的變數
            modal: '',
            tempProduct: {},
            qty: 1
        }
    },
    props: ['product', 'thousands'],
    template: `<div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-0">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <img :src="product.imageUrl" class="w-100 mb-3 mb-lg-0 mr-lg-3">
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <h3 class="h5 mb-2">{{ product.title }}</h3>
                            <del class="font-size-sm h6-md">原價：NT$ {{ thousands(product.origin_price) }}</del>
                            <h5 class="font-size-sm h6-md text-primary-dark">售價：NT$ {{ thousands(product.price) }}</h5>
                            <p>描述：{{ product.description }}</p>
                            <p class="mb-3">內容：{{ product.content }}</p>
                            <div class="input-group mb-3">
                                <input type="number" class="form-control rounded-0" min="1"
                                    aria-label="Recipient's username" aria-describedby="button-addon2" v-model.number="qty">
                                <div class="input-group-append">
                                    <button class="btn btn-primary text-white rounded-0" type="button"
                                        id="button-addon2" @click="$emit('addCart',product.id, qty)">加入購物車</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
    watch: {
        qty() {
            // input 數量不可輸入小於 0，否則強制設定為 1
            if (this.qty <= 0) {
                this.qty = 1;
            }
        },
        product() {
            this.tempProduct = this.product;  
            console.log('tem', this.tempProduct.price);
        }
    },
    methods: {
        openModal() {
            this.modal.show();
        },
        closeModal() {
            this.modal.hide();
        }
    },
    mounted() {
        // modal 初始化
        this.modal = new bootstrap.Modal(this.$refs.modal);
    }
};