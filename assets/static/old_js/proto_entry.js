extends ./base.jade

block title
    title Device Input

block header_scripts
    script(src="static/js/acm_entry.js")

block body_content
    div(class="container", id="main")
        div(class="jumbotron")
            h1 {{form_name}} Entry
        p(class="bg-info", id="info") Generated from "{{form_name}}_fields.json"
        p(class="bg-info", id="info", name="form_name") {{form_name}}_fields.json
        form(class="form-horizontal", id="my_form", role="form")
            for key in our_dic
                if our_dic[key]['field_type'] == 'radio'
                    div(class="control-group form-group", id="order-{{our_dic[key]['order']}} type-{{our_dic[key]['order']}}")
                        label(class="control-label",for=key) {{our_dic[key]['order']}}. {{key}}:
                        div(class="controls btn-group btn-group-justified", id=key, data-toggle="buttons", role="group")
                            for radio_value in our_dic[key]['radio_options']
                                label(class="btn btn-default")
                                    input(type="radio", name=key, value="{{radio_value}}")
                                    | {{radio_value}}
                elif our_dic[key]['field_type'] == 'drop_down'
                    div(class="control-group form-group", id="entry-{{our_dic[key]['order']}}")
                        label(class="control-group", for="{{key}}") {{our_dic[key]['order']}}. {{key}}:
                        div(class="controls")
                            select(class="form-control", id="{{key}}", name="{{key}}")
                                for dropdown_value in our_dic[key]['drop_down_options']
                                    if dropdown_value == our_dic[key]['drop_down_standard']
                                        option(selected="selected") {{dropdown_value}}
                                    else
                                        option {{dropdown_value}}
                elif our_dic[key]['field_type'] == 'numeric'
                    div(class="control-group form-group", id="entry-{{our_dic[key]['order']}}")
                        label(class="control-label", for="{{key}}") {{our_dic[key]['order']}}. {{key}}:
                        div(class="controls input-group")
                            input(type="text", class="form-control", name="{{key}}")
                            div(class="input-group-btn", id="{{key}}")
                                button(id="numeric_units_selected", type="button", class="btn btn-default dropdown-toggle", name="{{key}}", data-toggle="dropdown") {{our_dic[key]['standard_unit']}}
                                    span(class="caret")
                                ul(class="dropdown-menu dropdown-menu-right")
                                    for unit in our_dic[key]['available_units']
                                        li
                                            a(class="numeric_units_selector")
                                                | {{unit}}
                else
                    div(class="control-group form-group", id="entry-{{our_dic[key]['order']}}")
                        label(class="control-label", for="{{key}}") {{our_dic[key]['order']}}. {{key}}:
                        //- div(class="controls")
                        input(type="text", class="form-control", name="{{key}}")
        button(class="btn btn-primary", id="preview_submission") Preview Submission
        button(class="btn btn-primary", id="add_custom_field") Add Custom Field
    div(class="container", id="confirm")
        div(class="table-responsive", id="results_table")
        button(class="btn btn-success", id="confirm_submission") Confirm
        button(class="btn btn-danger", id="cancel_submission") Cancel
