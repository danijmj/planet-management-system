

<template>
    <div class="item">
        <i class="mainicon">
            <component v-bind:is="components[Math.floor(Math.random() * components.length)]"></component>
        </i>
      <div class="details">
        <h3>
            <slot name="name"></slot>
        </h3>
        <div class="actions">
            <div class="view">
                <RouterLink :to="viewUrl" title="See">
                    <i><ToolingIcon/></i>
                </RouterLink>
            </div>
            <div class="edit">
                <RouterLink :to="viewEdit" title="Edit">
                    <i><EcosystemIcon/></i>
                </RouterLink>
            </div>
            <div class="remove">
                <RouterLink :to="viewDelete" title="Delete">
                    <i><SupportIcon/></i>
                </RouterLink>
            </div>
        </div>
        <p>
            <span class="diameter">
              <strong>Diameter: </strong><slot name="diameter"></slot>
            </span>
            <span class="climate">
              <b>Climate: </b><slot name="climate"></slot>
            </span>
            <span class="terrain">
              <b>Terrain: </b><slot name="terrain"></slot>
            </span>
            <span class="population">
              <b>Population: </b><slot name="population"></slot>
            </span>
        </p>
      </div>
    </div>
</template>

<script lang="ts">
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import SupportIcon from './icons/IconSupport.vue'
import { RouterLink } from 'vue-router'
import IconPlanet from './icons/IconPlanet.vue'
import IconPlanetTwo from './icons/IconPlanetTwo.vue'

export default {
    name: 'planet-preview',
    components: {
    RouterLink,
    EcosystemIcon,
    SupportIcon,
    ToolingIcon
    },
    props: ['viewUrl', 'viewEdit', 'viewDelete'],

    setup() {
        const components = [
            IconPlanetTwo,
            IconPlanet
        ]

        return{
            components
        } 
    }
}
</script>
  
<style scoped>
  .item {
    margin-top: 2rem;
    display: flex;
    position: relative;
  }
  
  .details {
    flex: 1;
    margin-left: 1rem;
    position: relative;
  }

  .actions {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    div {
        a {
            display: block;
            padding: 3px;
        }
        i {
            display: block;
            background: none;
            width: 25px;
            height: 25px;
            border: 1px solid var(--color-border);
            background: var(--color-background);
            position: relative;
            svg {
                text-align: center;
                top: calc(50% - 10px);
                left: calc(50% - 9px);
                position: absolute;
            }
        }
    }
  }
  
  .mainicon {
    display: flex;
    place-items: center;
    place-content: center;
    width: 25px;
    height: 25px;
  }
  
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
  }
  p {
    padding: auto;
  }
  span {
    padding-right: 20px;
  }

  @media (min-width: 1024px) {
    .item {
      margin-top: 0;
      padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
      margin-bottom: 1rem;
    }
  
    .mainicon {
      top: calc(50% - 25px);
      left: -26px;
      position: absolute;
      border: 1px solid var(--color-border);
      background: var(--color-background);
      border-radius: 8px;
      width: 50px;
      height: 50px;
    }

    .item:first-of-type:before {
      display: none;
    }
  
    .item:last-of-type:after {
      display: none;
    }
  }
  </style>
  