import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from '../components/common/Toggle';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

function createToggleComponentShallow(mockFunction) {
    return shallow(<Toggle onToggle={mockFunction} />)
}

describe('Toggle Component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Toggle />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should work click event properly ', () => {

        const event = { target: { nodeName: 'SPAN' } };
        let mockFunction = jest.fn();

        const ToggleComponent = createToggleComponentShallow(mockFunction)
        const component = ToggleComponent.find('#toggleContainer')
        expect(component.exists()).toBeTruthy()
        component.find('#toggleContainer').simulate('click', event);
        expect(mockFunction).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
    })

    it('should not work click event properly when click is not on SPAN', () => {

        const event = { target: { nodeName: '' } };
        let mockFunction = jest.fn();

        const ToggleComponent = createToggleComponentShallow(mockFunction)
        const component = ToggleComponent.find('#toggleContainer')
        expect(component.exists()).toBeTruthy()
        component.find('#toggleContainer').simulate('click', event);
        expect(mockFunction).toHaveBeenCalledTimes(0)
        jest.clearAllMocks()
    })
})