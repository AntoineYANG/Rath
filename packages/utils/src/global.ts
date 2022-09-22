declare namespace Rath {

    /**
     * Data item. One row in the data table.
     * @interface IRow
     * @template V type of values
     */
    interface IRow<V extends number | string = number | string> {
        [key: string]: V;
    }
    
    /**
     * - quantitative
     * - nominal
     * - ordinal
     * - temporal
     */
    type SemanticType = 'quantitative' | 'nominal' | 'ordinal' | 'temporal';

}


export default Rath;
