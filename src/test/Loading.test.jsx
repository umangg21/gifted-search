import React from 'react';
import ReactDOM from 'react-dom';
import Loading from '../components/common/Loading';

import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

function createLoadingComponent() {
    return mount(<Loading />)
}

describe('Loading Component Test', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Loading />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render properly Loading Component', () => {
        const LoadingComponent = createLoadingComponent()
        const component = LoadingComponent.find('#loader')
        expect(component.exists()).toBeTruthy()
    })
})

