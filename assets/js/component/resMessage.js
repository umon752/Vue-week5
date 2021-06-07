export default {
    props: ['resText', 'resIsShow'],
    template: `<div
    class="message bg-white shadow text-dark d-flex justify-content-center align-items-center text-nowrap p-3" :class="{active: resIsShow}">
    {{ resText }}
</div>`
};