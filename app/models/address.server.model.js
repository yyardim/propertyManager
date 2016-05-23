'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddressSchema = new Schema({
    line1: {
        type: String,
        default: '',
        required: 'Address line required'
    },
    line2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: '',
        required: 'City required'
    },
    // state: {
    //     type: String,
    //     enum: [
    //         {
    //           'AL': 'Alabama',
    //           'AK': 'Alaska',
    //           'AS': 'American Samoa',
    //           'AZ': 'Arizona',
    //           'AR': 'Arkansas',
    //           'CA': 'California',
    //           'CO': 'Colorado',
    //           'CT': 'Connecticut',
    //           'DE': 'Delaware',
    //           'DC': 'District Of Columbia',
    //           'FM': 'Federated States Of Micronesia',
    //           'FL': 'Florida',
    //           'GA': 'Georgia',
    //           'GU': 'Guam',
    //           'HI': 'Hawaii',
    //           'ID': 'Idaho',
    //           'IL': 'Illinois',
    //           'IN': 'Indiana',
    //           'IA': 'Iowa',
    //           'KS': 'Kansas',
    //           'KY': 'Kentucky',
    //           'LA': 'Louisiana',
    //           'ME': 'Maine',
    //           'MH': 'Marshall Islands',
    //           'MD': 'Maryland',
    //           'MA': 'Massachusetts',
    //           'MI': 'Michigan',
    //           'MN': 'Minnesota',
    //           'MS': 'Mississippi',
    //           'MO': 'Missouri',
    //           'MT': 'Montana',
    //           'NE': 'Nebraska',
    //           'NV': 'Nevada',
    //           'NH': 'New Hampshire',
    //           'NJ': 'New Jersey',
    //           'NM': 'New Mexico',
    //           'NY': 'New York',
    //           'NC': 'North Carolina',
    //           'ND': 'North Dakota',
    //           'MP': 'Northern Mariana Islands',
    //           'OH': 'Ohio',
    //           'OK': 'Oklahoma',
    //           'OR': 'Oregon',
    //           'PW': 'Palau',
    //           'PA': 'Pennsylvania',
    //           'PR': 'Puerto Rico',
    //           'RI': 'Rhode Island',
    //           'SC': 'South Carolina',
    //           'SD': 'South Dakota',
    //           'TN': 'Tennessee',
    //           'TX': 'Texas',
    //           'UT': 'Utah',
    //           'VT': 'Vermont',
    //           'VI': 'Virgin Islands',
    //           'VA': 'Virginia',
    //           'WA': 'Washington',
    //           'WV': 'West Virginia',
    //           'WI': 'Wisconsin',
    //           'WY': 'Wyoming'
    //         }            
    //     ]
    // },
    zip: {
        type: String,
        match: [/^\d{5}$/, 'Please enter a 5 digit zip code'],
        required: 'Zip required'
    }
});

mongoose.model('Address', AddressSchema);

module.exports = {
    addressSchema: AddressSchema
};