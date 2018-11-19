<template>
    <div class="input-text">
        <input :type="type" class="form-control" v-bind:name="name" :id="id" :value="value" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
    name: 'input-component',
    props: ['type', 'name', 'id', 'value', 'placeholder'],
}
</script>

