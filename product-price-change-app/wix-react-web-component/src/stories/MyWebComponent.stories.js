import MyWebComponent from "../MyWebComponent";

export default {
    title: 'My Web Component',
    component: MyWebComponent
}

const Template = args => <MyWebComponent {...args}/>

export const ViewModeEditor = Template.bind({})

ViewModeEditor.args ={
    wixconfig: '{"instanceId":"5390686d-1002-4c8c-aa93-8ee4f6e042f0","viewMode":"Site"}',
    wixsettings : '{"border":"10"}'
}

