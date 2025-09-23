import { defineStore } from 'pinia'

export const useStore = defineStore( 'taxon', {

  state: () => ( { taxonArr: [] } ),

  getters: {
    // 物种统计
    speciesList: state => {
      const arr = []
      for ( let i = 0; i < state.taxonArr.length; i++ ) {
        arr.push( state.taxonArr[ i ].map( v => Object.assign( {}, v, { month: i + 1 } ) ) )
      }

      const specObj = arr.flat().reduce( ( acc, cur ) => {
        const id = cur[ 'taxon_id' ]
        if ( !acc[ id ] ) {
          acc[ id ] = {
            orderName: cur[ 'taxonordername' ],
            familyName: cur[ 'taxonfamilyname' ],
            specName: cur[ 'taxonname' ],
            latin: cur[ 'latinname' ],
            specEnName: cur[ 'englishname' ],
            recordCount: 0,
            monthly: [],
            id
          }
        }
        acc[ id ][ 'recordCount' ] += cur[ 'recordcount' ]
        acc[ id ][ 'monthly' ].push( { month: cur[ 'month' ], count: cur[ 'recordcount' ] } )

        return acc
      }, {} )
      return Object.values( specObj ).sort( ( a, b ) => b.recordCount - a.recordCount )
    },
    // 目统计&科统计
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