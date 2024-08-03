let vm = new Vue({
    el: "#app",
    delimiters: ["[[", "]]"],
    data: {
        locations: [{
                's_no': 1,
                'name': 'dolor',
                'boolean': 'Active',
                'address_line_1': "donec",
                'address_line_2': "aquipasing",
                'address_line_3': "ipsum",
                'postal_code': 62340,
                'country': "India",
                'state': "TamilNadu",
                'latitude': 223421.1246731098125121,
                'longitude': 223421.1246731098125121,
            }, {
                's_no': 2,
                'name': 'donec',
                'boolean': 'Inactive',
                'address_line_1': "lorem",
                'address_line_2': "ispum",
                'address_line_3': "timper",
                'postal_code': 62000312313445,
                'country': "Zimbabwe",
                'state': "Bulawayo Province",
                'latitude': 223421.1246731098125121,
                'longitude': 223421.1246731098125121,
            }, {
                's_no': 3,
                'name': 'venenatis',
                'boolean': 'Active',
                'address_line_1': "Lorem ipsum dolor sit amet",
                'address_line_2': "consectetur adipiscing elit",
                'address_line_3': "Aliquam molestie libero erat",
                'postal_code': 22408,
                'country': "Afghanistan",
                'state': "Badakhshan",
                'latitude': 223421.1246731098125121,
                'longitude': 223421.1246731098125121,
            }, {
                's_no': 4,
                'name': 'semper',
                'boolean': 'Inactive',
                'address_line_1': "pulvinar turpis fermentum quis",
                'address_line_2': "Etiam pharetra facilisis ",
                'address_line_3': "Duis ac sapien eget quam",
                'postal_code': 22345,
                'country': "Australia",
                'state': "New South Wales",
                'latitude': 223421.1246731098125121,
                'longitude': 223421.1246731098125121,
            }, {
                's_no': 5,
                'name': 'mauris',
                'boolean': 'Active',
                'address_line_1': "Pellentesque euismod",
                'address_line_2': "Curabitur augue risus",
                'address_line_3': "Vivamus facilisis sem tristique",
                'postal_code': 63215,
                'country': "Bangladesh",
                'state': "Madaripur District",
                'latitude': 223421.1246731098125121,
                'longitude': 223421.1246731098125121,
            }
        ],
        // Add Location
        is_add_modal_open: false,
        is_add_additional_options: false,
        add_location_name: "",
        is_switched: "Active",
        add_address_line_1: "",
        add_address_line_2: "",
        add_address_line_3: "",
        add_postal_code: "",
        add_country: "",
        add_state: "",
        add_latitude: "",
        add_longitude: "",
        selected_country: [],
        selected_states: [],
        // Edit Location
        is_update_modal_open: false,
        is_update_additional_options: false,
        edit_location_name: "",
        edit_boolean: "",
        edit_address_line_1: "",
        edit_address_line_2: "",
        edit_address_line_3: "",
        edit_postal_code: "",
        edit_country: "",
        edit_state: "",
        edit_latitude: "",
        edit_longitude: "",
        location_index: 0,
        // delete location
        is_delete_modal_open: false,
        delete_index: 0,
        delete_location_name: "",
        // location Information
        is_information_modal_open: false,
        is_information_additional_options: false,
        detail_information: {},
        // others
        is_loading: false,
        // errors
        create_errors: "",
        edit_errors: "",
        delete_errors: "",
        is_add_show_errors: false,
        is_edit_show_errors: false,
        is_delete_show_errors: false,
        data: [],
    },
    mounted: function() {
        let country = [];
        axios.get("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates.json")
            .then(function(response) {
                response.data.forEach((item) => {
                    let data = item;
                    country.push(data);
                });
            });
        this.selected_country = country;
        let header_modal = document.getElementsByClassName("modal-card-head");
        for(let i = 0; i < header_modal.length; i++){
            header_modal[i].style.backgroundColor = "white";
        }
        let footer_modal = document.getElementsByClassName("modal-card-foot");
        for(let i = 0; i < footer_modal.length; i++){
            footer_modal[i].style.backgroundColor = "white";
        }
    },
    methods: {
        // opening modal
        open_add_location_modal() {
            document.getElementById("is_add_modal_open").classList.add("is-active");
        },
        open_add_more_location_modal() {
            this.save_location_data();
            document.getElementById("is_add_modal_open").classList.add("is-active");
        },
        open_update_location_modal(index) {
            document.getElementById("is_update_modal_open").classList.add("is-active");
            this.edit_location_name = this.locations[index]['name'];
            this.edit_boolean = this.locations[index]['boolean'];
            this.edit_address_line_1 = this.locations[index]['address_line_1'];
            this.edit_address_line_2 = this.locations[index]['address_line_2'];
            this.edit_address_line_3 = this.locations[index]['address_line_3'];
            this.edit_postal_code = this.locations[index]['postal_code'];
            this.edit_country = this.locations[index]['country'];
            this.edit_state = this.locations[index]['state'];
            this.edit_latitude = this.locations[index]['latitude'];
            this.edit_longitude = this.locations[index]['longitude'];
            this.location_index = index;
        },
        open_delete_location_modal(key, item) {
            document.getElementById("is_delete_modal_open").classList.add("is-active");
            this.delete_index = key;
            this.delete_location_name = item["name"];
        },
        open_information_location_modal(prop) {
            document.getElementById("is_information_modal_open").classList.add("is-active");
            this.detail_information = {
                'name': prop['name'],
                'boolean': prop['boolean'],
                'address_line_1': prop['address_line_1'],
                'address_line_2': prop['address_line_2'],
                'address_line_3': prop['address_line_3'],
                'postal_code': prop['postal_code'],
                'country': prop['country'],
                'state': prop['state'],
                'latitude': prop['latitude'],
                'longitude': prop['longitude'],
            }
        },
        // closing modal
        close_add_location_modal() {
            document.getElementById("is_add_modal_open").classList.remove("is-active");
            this.is_add_additional_options = false;
            this.clear_add_location_data();
            this.is_add_show_errors = false;
        },
        close_update_location_modal() {
            document.getElementById("is_update_modal_open").classList.remove("is-active");
            this.is_update_additional_options = false;
            this.is_edit_show_errors = false;
        },
        close_delete_location_modal() {
            document.getElementById("is_delete_modal_open").classList.remove("is-active");
            this.is_delete_show_errors = false;
        },
        close_information_location_modal() {
            document.getElementById("is_information_modal_open").classList.remove("is-active");
            this.is_information_additional_options = false;
        },
        // CRUD 
        save_location_data() {
            // performs the new data is add to the object. once the data is updated, the modal is closed, success toast is displayed, and the table refresh with latest data
            let location_number = this.locations.length + 1;
            let tmp = {
                's_no': location_number,
                'name': this.add_location_name,
                'boolean': this.is_switched,
                'address_line_1': this.add_address_line_1,
                'address_line_2': this.add_address_line_2,
                'address_line_3': this.add_address_line_3,
                'postal_code': this.add_postal_code,
                'country': this.add_country,
                'state': this.add_state,
                'latitude': this.add_latitude,
                'longitude': this.add_longitude,
            };
            this.is_loading = true;
            setTimeout(() => {
                this.is_loading = false;
                if (this.add_location_name.length < 4) {
                    this.is_add_show_errors = true;
                    this.create_errors = "Name should contain four characters";
                } else {
                    this.locations.push(tmp);
                    this.clear_add_location_data();
                    document.getElementById("is_add_modal_open").classList.remove("is-active");
                    this.$buefy.toast.open({
                        message: "Location added successfully",
                        type: "is-success",
                    });
                }
            }, 3000)
            this.is_add_show_errors = false;
        },
        clear_add_location_data() {
            // clear the input data from the user
            this.add_location_name = "";
            this.add_address_line_1 = "";
            this.add_address_line_2 = "";
            this.add_address_line_3 = "";
            this.add_postal_code = "";
            this.add_country = "";
            this.add_state = "";
            this.add_latitude = "";
            this.add_longitude = "";
        },
        update_location_data(prop, item) {
            // performs new data is used to replace the existing data. once the data is updated, the modal is closed, success toast is displayed, and the table refresh with latest data.
            let update_location = {
                'name': this.edit_location_name,
                'boolean': this.edit_boolean,
                'address_line_1': this.edit_address_line_1,
                'address_line_2': this.edit_address_line_2,
                'address_line_3': this.edit_address_line_3,
                'postal_code': this.edit_postal_code,
                'country': this.edit_country,
                'state': this.edit_state,
                'latitude': this.edit_latitude,
                'longitude': this.edit_longitude,
            };
            this.is_loading = true;
            setTimeout(() => {
                this.is_loading = false;
                if (this.edit_location_name.length < 4) {
                    this.is_edit_show_errors = true;
                    this.edit_errors = "Name should contain four characters";
                } else {
                    prop[item]['name'] = update_location['name'];
                     document.getElementById("is_update_modal_open").classList.remove("is-active");
                    this.is_update_additional_options = false;
                    this.$buefy.toast.open({
                        message: "Location edited successfully",
                        type: "is-success",
                    });
                }
            }, 3000)
            this.is_edit_show_errors = false;

        },
        delete_location_data(row_index, prop) {
            // performs the existing data in the object is deleted using array index. once the data is deleted, the dialog box is closed, success toast is displayed, and the table refresh with latest data
            this.is_loading = true;
            setTimeout(() => {
                this.is_loading = false;
                if (prop[row_index]['name'] == "dolor") {
                    this.is_delete_show_errors = true;
                    this.delete_errors = "This location name already exists"
                } else {
                    this.locations.splice(row_index, 1);
                     document.getElementById("is_delete_modal_open").classList.remove("is-active");
                    this.$buefy.toast.open({
                        message: "Location deleted successfully",
                        type: "is-success",
                    });
                }
            }, 3000)
            this.is_delete_show_errors = false;

        },
        // others
        active_searchable(obj, str) {
            return str.toUpperCase() && obj["boolean"].includes(str);
        },
        set_states(selected) {
            let select_state = document.getElementById("state");
            select_state.options.length = 0;
            this.selected_country.forEach((key) => {
                if (selected == key['name']) {
                    key['states'].forEach((item) => {
                        this.selected_states.push(item['name']);
                    });
                }
            });
        },
        status_type(bool) {
            if (bool == "Active") {
                return 'has-background-success has-text-white';
            } else if (bool == "Inactive") {
                return 'has-background-danger-light has-text-danger-dark';
            }
        },
    },

})