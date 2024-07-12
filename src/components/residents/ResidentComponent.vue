<template>
    <div class="resident">
        <div class="details">
            <details>
                <summary>
                    <span class="type">{{ resident.name }}</span> 
                </summary>            
                <div class="body">
                    <p v-if="resident.mass"><strong>mass: </strong> {{ resident.mass }}</p>
                    <p v-if="resident.height"><strong>height: </strong> {{ resident.height }}</p>
                    <p v-if="resident.birthYear"><strong>birth year: </strong>{{ resident.birthYear }}</p>
                    <p v-if="resident.gender"><strong>Gender: </strong>{{ resident.gender }}</p>
                    <p v-if="resident.hairColor"><strong>hairColor: </strong>{{ resident.hairColor }}</p>
                    <p v-if="resident.skinColor"><strong>skinColor: </strong>{{ resident.skinColor }}</p>
                    <p v-if="resident.eyeColor"><strong>eyeColor:</strong> {{ resident.eyeColor }}</p>
                </div>
            </details>
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

    details {
        width: 100%;
    }
    
    summary {
        padding: 10px 20px;
        font-size: large;
        font-weight: 600;
        background-color: #f2f2f2;
        min-width: auto;
        width: auto;
    }

    .body {
        font-size: medium;
        font-weight: normal;
        margin-top: 1px solid #c0c0c0;
        transition: all ease-in-out .5s;

        span:not([class="ttle"]) {
            display: block;
            padding: 5px;
            transition: all ease-in-out .5s;
            font-weight: 600;
            color: rgb(82, 82, 82);
            .ttle {
                color: rgb(82, 82, 82);
                margin-right: 5px;
                font-weight: normal;
            }
        }
        span:not([class="ttle"]):hover {
            background: #e6e6e6;
        }
    }

    details summary  {
        margin-bottom: -10px; /* for more prominent move */
        transition: margin .3s ease-out;
    }

    details[open] summary {
        margin-bottom: 5px;
    }

    details[open] summary ~ * {
        /* animation: sweep .5s ease-in-out; */
        margin-bottom: 0px;
    }
    
</style>
    