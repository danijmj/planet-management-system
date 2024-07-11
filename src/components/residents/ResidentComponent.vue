<template>
    <div class="resident">
        <div class="details">
            <h4>
                {{ resident.name }}
            </h4>
            <div>
                <p v-if="resident.mass"><strong>mass: </strong> {{ resident.mass }}</p>
                <p v-if="resident.height"><strong>mass: </strong> {{ resident.height }}</p>
                <p v-if="resident.birthYear"><strong>birth year: </strong>{{ resident.birthYear }}</p>
                <p v-if="resident.gender"><strong>Gender: </strong>{{ resident.gender }}</p>
                <p v-if="resident.hairColor"><strong>hairColor: </strong>{{ resident.hairColor }}</p>
                <p v-if="resident.skinColor"><strong>skinColor: </strong>{{ resident.skinColor }}</p>
                <p v-if="resident.eyeColor"><strong>eyeColor:</strong> {{ resident.eyeColor }}</p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
    import { type Habitant } from '@/types/planet'

    defineProps<{
        resident: Habitant
    }>()

</script>
    
<style scoped>
    .resident {
        margin-top: .5rem;
    }
   

    .mainicon {
        display: flex;
        place-items: center;
        place-content: center;
        width: 25px;
        height: 25px;
    }

    h4 {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
        color: var(--color-heading);
    }
    p {
        padding: auto;
    }

    @media (min-width: 1024px) {
        .resident {
            margin-top: 0;
            padding: 0.4rem 0 1rem;
            margin-bottom: 1rem;
        }
    }
</style>
    