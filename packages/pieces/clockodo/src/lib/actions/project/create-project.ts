import { createAction, Property } from "@activepieces/pieces-framework";
import { clockodoCommon, emptyToNull, makeClient } from "../../common";

export default createAction({
    name: 'create_project',
    displayName: 'Create Project',
    description: 'Creates a project in clockodo',
    props: {
        authentication: clockodoCommon.authentication,
        name: Property.ShortText({
            displayName: 'Name',
            required: true
        }),
        // This might be changed to a dropdown later on but the list can become quite long, therefor it's not feasible right now
        customer_id: Property.Number({
            displayName: 'Customer ID',
            required: true
        }),
        number: Property.ShortText({
            displayName: 'Number',
            required: false
        }),
        active: Property.Checkbox({
            displayName: 'Active',
            required: false
        }),
        billable: Property.Checkbox({
            displayName: 'Billable',
            required: false
        }),
        budget: Property.Number({
            displayName: 'Budget',
            required: false
        }),
        budget_is_hours: Property.Checkbox({
            displayName: 'Budget in hours?',
            required: false
        }),
        budget_is_not_strict: Property.Checkbox({
            displayName: 'Soft Budget',
            required: false
        }),
        note: Property.LongText({
            displayName: 'Note',
            required: false
        })
    },
    async run(context) {
        const client = makeClient(context);
        const res = await client.createProject({
            name: context.propsValue.name,
            customers_id: context.propsValue.customer_id,
            number: emptyToNull(context.propsValue.number),
            active: context.propsValue.active,
            billable_default: context.propsValue.billable,
            note: emptyToNull(context.propsValue.note),
            budget_money: context.propsValue.budget,
            budget_is_hours: context.propsValue.budget_is_hours,
            budget_is_not_strict: context.propsValue.budget_is_not_strict
        })
        return res.project
    }
})