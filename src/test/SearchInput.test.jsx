import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import SearchInput from '../components/common/SearchInput';

configure({ adapter: new Adapter() });

function createSearchComponentShallow(mock, mockFunction) {
    return shallow(
        <SearchInput
            context={mock}
            name="testName"
            afterInput={mockFunction}
        />
    )
}

function createSearchComponentShallowWithoutAfterInput(mock) {
    return shallow(
        <SearchInput
            context={mock}
            name="testName"
        />
    )
}


function createSearchComponentShallowSubmit(mockFunction) {
    return shallow(<SearchInput onSubmit={mockFunction} />)
}


describe('Search Input Component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchInput />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should work keyPress Event properly when keyCode provided', () => {

        const event = { keyCode: 13 };
        let mockFunction1 = jest.fn();

        const SearchComponent = createSearchComponentShallowSubmit(mockFunction1)
        const component = SearchComponent.find('#searchInput')
        expect(component.exists()).toBeTruthy()
        component.find('input').simulate('keyPress', event);
        expect(mockFunction1).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
    })

    it('should work keyPress Event properly when charCode provided', () => {

        const event = { charCode: 13 };
        let mockFunction1 = jest.fn();

        const SearchComponent = createSearchComponentShallowSubmit(mockFunction1)
        const component = SearchComponent.find('#searchInput')
        expect(component.exists()).toBeTruthy()
        component.find('input').simulate('keyPress', event);
        expect(mockFunction1).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
    })

    it('should work keyPress Event properly when which provided', () => {

        const event = { which: 13 };
        let mockFunction1 = jest.fn();

        const SearchComponent = createSearchComponentShallowSubmit(mockFunction1)
        const component = SearchComponent.find('#searchInput')
        expect(component.exists()).toBeTruthy()
        component.find('input').simulate('keyPress', event);
        expect(mockFunction1).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
    })

    it('should not work keyPress Event when key is deferent', () => {

        const event = { which: 14 };
        let mockFunction1 = jest.fn();

        const SearchComponent = createSearchComponentShallowSubmit(mockFunction1)
        const component = SearchComponent.find('#searchInput')
        expect(component.exists()).toBeTruthy()
        component.find('input').simulate('keyPress', event);
        expect(mockFunction1).toHaveBeenCalledTimes(0)
        jest.clearAllMocks()
    })

    it('should work change event properly', () => {
        const event = { target: { value: "test" } };
        let mockElement = { state: {} };
        mockElement.setState = function () { }
        mockElement.forceUpdate = function () { }

        let mockFunction = jest.fn();
        const SearchComponent = createSearchComponentShallow(mockElement, mockFunction)
        const component = SearchComponent.find('#searchInput')
        expect(component.exists()).toBeTruthy()
        component.find('input').simulate('change', event);

        expect(mockElement.state.testName).toBe(event.target.value)
        expect(mockElement.state.offset).toBe(0)
        expect(mockFunction).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
    })

    it('should not call after on change event if not provided', () => {
        const event = { target: { value: "test" } };
        let mockElement = { state: {} };
        mockElement.setState = function () { }
        mockElement.forceUpdate = function () { }

        let mockFunction = jest.fn();
        const SearchComponent = createSearchComponentShallowWithoutAfterInput(mockElement)
        const component = SearchComponent.find('#searchInput')
        expect(component.exists()).toBeTruthy()
        component.find('input').simulate('change', event);

        expect(mockElement.state.testName).toBe(event.target.value)
        expect(mockElement.state.offset).toBe(0)
        expect(mockFunction).toHaveBeenCalledTimes(0)
        jest.clearAllMocks()
    })
})
