const _ = require('lodash');

module.exports = {
    buildEnumInfo,
    getCriteriaBuilder,
};

/**
 * Build an enum object
 * @param {any} field : entity field
 * @param {string} angularAppName
 * @param {string} packageName
 * @param {string} clientRootFolder
 */
function buildEnumInfo(field, angularAppName, packageName, clientRootFolder) {
    const fieldType = field.fieldType;
    field.enumInstance = _.lowerFirst(fieldType);
    return {
        enumName: fieldType,
        enumValues: field.fieldValues.split(',').join(', '),
        enumInstance: field.enumInstance,
        enums: field.fieldValues.replace(/\s/g, '').split(','),
        angularAppName,
        packageName,
        clientRootFolder: clientRootFolder ? `${clientRootFolder}-` : '',
    };
}
function getCriteriaBuilder(fieldType) {
    if (['Integer', 'Long', 'Float', 'Double', 'BigDecimal', 'LocalDate', 'ZonedDateTime', 'Instant', 'Duration'].includes(fieldType)) {
        return 'buildRangeCriteria';
    }
    if (fieldType === 'String') {
        return 'buildStringCriteria';
    }
    return 'buildCriteria';
}
