import { defineStore } from 'pinia'

export const useStore = defineStore( 'taxon', {

  state: () => ( { taxonArr: [] } ),

  getters: {
    speciesList: state => {
      const arr = [ ...state.taxonArr ].flat()
      return arr.reduce( ( acc, cur ) => {
        const id = cur[ 'taxon_id' ]
        if ( !acc[ id ] ) {
          acc[ id ] = {
            orderName: cur[ 'taxonordername' ],
            familyName: cur[ 'taxonfamilyname' ],
            specName: cur[ 'taxonname' ],
            latin: cur[ 'latinname' ],
            specEnName: cur[ 'englishname' ]
          }
        }
        return acc
      }, {} )
    },
    taxonList: state => {
      const arr = Object.values( state.speciesList )
      const family = [], order = []
      for ( let item of arr ) {
        family.push( item[ 'familyName' ] )
        order.push( item[ 'orderName' ] )
      }
      return { order: [ ...new Set( order ) ], family: [ ...new Set( family ) ] }
    }
  },

  actions: {
    clear () {
      this.taxonArr = []
    },
    addTaxonData ( taxon ) {
      this.taxonArr = [ ...taxon ]
    }
  }
} )