import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Search from '../components/Search';
import { GiphyService } from '../service/GiphyService';

configure({ adapter: new Adapter() });

function createShallowSearchComponent() {
    return mount(
        <Search />
    )
}

describe('Search Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should change Dark Mode on click on Toggle', async () => {

        const ShallowSearchComponent = createShallowSearchComponent()

        const ShallowSearchComponentInstance = ShallowSearchComponent.instance()

        expect(ShallowSearchComponent.state('darkMode')).toBe(false)

        ShallowSearchComponentInstance.toggleDarkMode()
        await (0)
        expect(ShallowSearchComponent.state('darkMode')).toBe(true)

        ShallowSearchComponentInstance.toggleDarkMode()
        await (0)
        expect(ShallowSearchComponent.state('darkMode')).toBe(false)

    })

    it('should bring to initial mode on header click', async () => {

        const ShallowSearchComponent = createShallowSearchComponent()

        ShallowSearchComponent.find('#gifted-header-title').simulate('click')
        await (0)
        expect(ShallowSearchComponent.state('initial')).toBe(true)
    })

    it('should render giphy list when not on initial mode', async () => {

        const ShallowSearchComponent = createShallowSearchComponent()

        const ShallowSearchComponentInstance = ShallowSearchComponent.instance()

        const component = ShallowSearchComponent.find('#giphy-list')
        expect(component.exists()).toBeFalsy()

        ShallowSearchComponentInstance.setState({ initial: false })
        await (0)
        expect(ShallowSearchComponent.state('initial')).toBe(false)
        ShallowSearchComponent.update()

        const component2 = ShallowSearchComponent.find('#giphy-list')
        expect(component2.exists()).toBeTruthy()

    })

    it('should render loading component if loading state is true', async () => {

        const ShallowSearchComponent = createShallowSearchComponent()
        const ShallowSearchComponentInstance = ShallowSearchComponent.instance()

        const component = ShallowSearchComponent.find('#loader')
        expect(component.exists()).toBeFalsy()

        ShallowSearchComponentInstance.setState({ isLoading: true })
        await (0)
        expect(ShallowSearchComponent.state('isLoading')).toBe(true)
        ShallowSearchComponent.update()

        const component2 = ShallowSearchComponent.find('#loader')
        expect(component2.exists()).toBeTruthy()
    })


    it('should render giphys', async () => {

        const giphy = {
            id: "vidddd",
            images: {
                fixed_width: {
                    mp4: ""
                }
            }
        }

        const ShallowSearchComponent = createShallowSearchComponent()
        const ShallowSearchComponentInstance = ShallowSearchComponent.instance()

        ShallowSearchComponentInstance.setState({ initial: false, darkMode: true, giphyList: [giphy] })
        await (0)
        expect(ShallowSearchComponent.state('initial')).toBe(false)
        ShallowSearchComponent.update()

        const component2 = ShallowSearchComponent.find(`#${giphy.id}`)
        expect(component2.exists()).toBeTruthy()
    })

    it('should clear giphy list and set initial mode false on submit in search', async () => {
        const event = { keyCode: 13 }
        const ShallowSearchComponent = createShallowSearchComponent()
        ShallowSearchComponent.find('#searchInput').simulate('keyPress', event)
        await (0)
        expect(ShallowSearchComponent.state('initial')).toBe(false)
        expect(ShallowSearchComponent.state('giphyList')).toStrictEqual([])
    })
    
})