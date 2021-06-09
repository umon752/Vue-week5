import resMessage from './component/resMessage.js';
import productList from './component/productList.js';
import pagination from './component/pagination.js';
import productModal from './component/productModal.js';
import cartList from './component/cartList.js';

const url = 'https://vue3-course-api.hexschool.io';
const path = 'umon752';



const app = Vue.createApp({
    data() {
        return {
            loadingStatus: false,
            productsData: [],
            pagination: {},
            productData: {},
            cartsData: {
                carts: []
            },
            resObj: {
                resMessage: '',
                isShowReaMessage: false
            },
            orderData: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            }
        };
    },
    methods: {
        resMessage(text) {
            // 顯示訊息
            this.resObj.isShowReaMessage = true;
            setTimeout(() => {
                this.resObj.isShowReaMessage = false;
            }, 1000);
            this.resObj.resMessage = text;
        },
        getProductsData(currentPage = 1) {
            const api = `${url}/api/${path}/products?page=${currentPage}`;
            this.loadingStatus = true;
            axios.get(api)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data);
                        this.productsData = res.data.products;
                        this.pagination = res.data.pagination;
                        AOS.init({
                            easing: 'ease',
                            duration: 800,
                            once: true
                        });
                    } else {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                    this.loadingStatus = false;
                }).catch((error) => {
                    console.log(error);
                });
        },
        addCart(id, qty = 1) {
            const api = `${url}/api/${path}/cart`;
            const product = {
                data: {
                    product_id: id,
                    qty
                }
            }
            this.loadingStatus = true;
            axios.post(api, product)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data);
                        this.getCartsData();
                        this.resMessage(res.data.message);
                        this.closeModal();
                    } else {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                    this.loadingStatus = false;
                }).catch((error) => {
                    console.log(error);
                });
        },
        getCartsData() {
            const api = `${url}/api/${path}/cart`;
            axios.get(api)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data);
                        this.cartsData = res.data.data;
                    }
                }).catch((error) => {
                    console.log(error);
                });
        },
        delCartData(id) {
            const api = `${url}/api/${path}/cart/${id}`;
            this.loadingStatus = true;
            axios.delete(api)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data);
                        this.getCartsData();
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                    this.loadingStatus = false;
                }).catch((error) => {
                    console.log(error);
                });
        },
        delAllCartsData() {
            const api = `${url}/api/${path}/carts`;
            this.loadingStatus = true;
            axios.delete(api)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data);
                        this.getCartsData();
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    } else {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                    this.loadingStatus = false;
                }).catch((error) => {
                    console.log(error);
                });
        },
        updateCart(item) {
            this.loadingStatus = true;
            if (item.qty <= 0) {
                // 顯示訊息
                this.resMessage('數量不可小於 0，請重新輸入');
                // input 數量不可輸入小於 0，否則強制設定為 1
                item.qty = 1;
                this.loadingStatus = false;
            } else {
                const api = `${url}/api/${path}/cart/${item.id}`;
                const cart = {
                    data: {
                        product_id: item.product.id,
                        qty: item.qty
                    }
                }
                axios.put(api, cart)
                    .then((res) => {
                        if (res.data.success) {
                            // console.log(res.data);
                            this.getCartsData();
                            // 顯示訊息
                            this.resMessage(res.data.message);
                        } else {
                            // 顯示訊息
                            this.resMessage(res.data.message);
                        }
                        this.loadingStatus = false;
                    }).catch((error) => {
                        console.log(error);
                    });
            }

        },
        sendOrder() {
            const api = `${url}/api/${path}/order`;
            const order = {
                data: {
                    ...this.orderData
                }
            }
            this.loadingStatus = true;
            axios.post(api, order)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        // console.log(res.data);
                        this.getCartsData();
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    } else {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                    this.loadingStatus = false;
                }).catch((error) => {
                    console.log(error);
                });
        },
        openModal(item) {
            const api = `${url}/api/${path}/product/${item.id}`;
            this.loadingStatus = true;
            axios.get(api)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data);
                        this.$refs.modal.openModal();
                        this.productData = item;
                    } else {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                    this.loadingStatus = false;
                }).catch((error) => {
                    console.log(error);
                });
        },
        closeModal() {
            this.$refs.modal.closeModal();
        },
        thousands(num) {
            let parts = num.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }
    },
    mounted() {
        this.getProductsData();
        this.getCartsData();
    },
    components: {
        resMessage,
        productList,
        pagination,
        productModal,
        cartList
    }
});

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);


app.mount('#app');