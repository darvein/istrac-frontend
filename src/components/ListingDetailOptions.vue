<template>
  <aside class="listing-detail-options">
    <ul class="options-list">
      <li class="option-item">
        <i class="fas fa-heart"></i>
        <span>Agregar a Favoritos</span>
      </li>
      <li class="option-item">
        <i class="fas fa-star"></i>
        <span>Vota por el lugar</span>
      </li>
      <li class="option-item">
        <i class="fas fa-clone"></i>
        <span>Otras opciones</span>
      </li>
      <li class="option-item">
        <i class="fas fa-thumbs-up"></i>
        <span>Opciones Recomendadas</span>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.listing-detail-options {
  /* You can add additional styles specific to the detail options sidebar here */
}

.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.option-item i {
  margin-right: 8px;
  color: #2f3132;
}

.option-item:hover {
  background-color: #f0f2f5;
}

.option-item span {
  /* If you want to style the text specifically, you can add styles here */
}
</style>
