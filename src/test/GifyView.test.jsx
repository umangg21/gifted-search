import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import GifyView from '../components/GifyView';

configure({ adapter: new Adapter() });

function createGiphyComponentShallow(giphy) {
    return mount(<GifyView giphy={giphy} />)
}

describe('GifyView Component', () => {
    it('renders without crashing', () => {

        const giphy = {
            id: 1,
            images: {
                fixed_width: {
                    mp4: ""
                }
            }
        }
        const div = document.createElement('div');
        ReactDOM.render(<GifyView giphy={giphy} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    it('should play video on card click', async () => {

        const giphy = {
            id: "vidddd",
            images: {
                fixed_width: {
                    mp4: ""
                }
            }
        }

        const GiphyComponent = createGiphyComponentShallow(giphy)
        expect(GiphyComponent.state('play')).toBe(false);
        GiphyComponent.simulate('click');
        await(0)
        expect(GiphyComponent.state('play')).toBe(true);
    })

    it('should pause video after ended', async () => {

        const giphy = {
            id: 1,
            images: {
                fixed_width: {
                    mp4: ""
                }
            }
        }

        const GiphyComponent = createGiphyComponentShallow(giphy)
        expect(GiphyComponent.state('play')).toBe(false);
        GiphyComponent.simulate('click');
        await(0)
        expect(GiphyComponent.state('play')).toBe(true);
        await(0)
        GiphyComponent.find('video').simulate('ended');
        expect(GiphyComponent.state('play')).toBe(false);
    })

    it('should show controls on loaded video', async () => {

        const giphy = {
            id: "vidddd",
            images: {
                fixed_width: {
                    mp4: ""
                }
            }
        }

        const GiphyComponent = createGiphyComponentShallow(giphy)
        expect(GiphyComponent.state('showControls')).toBe(false);
        GiphyComponent.find('video').simulate('loadedData');
        await(0)
        expect(GiphyComponent.state('showControls')).toBe(true);
    })

})
