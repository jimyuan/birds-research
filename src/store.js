import { defineStore } from 'pinia'

export const useStore = defineStore( 'taxon', {

  state: () => ( { taxonArr: [] } ),

  actions: {
    clear () {
      this.taxonArr = []
    },
    addTaxonData ( taxon ) {
      this.taxonArr = [ ...taxon ]
    }
  }
} )