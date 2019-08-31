import React, { Component } from 'react'
import { GiphyService } from '../service/GiphyService';
import Loading from './common/Loading';
import SearchInput from './common/SearchInput';
import GifyView from './GifyView';
import * as debounce from "debounce";
import Toggle from './common/Toggle';
import { SunIcon, MoonIcon } from '../assets/icons';

export default class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchQuery: "",
            offset: 0,
            giphyList: [],
            darkMode: false,
            isLoading: false,
            isError: false,
        }
    }

    delayedGetGipyhs = () => {
        this.delayedGetter.clear();
        this.delayedGetter();
    };

    getGipyhs = () => {
        this.setState({ isLoading: true, isError: false })

        const { offset, searchQuery } = this.state
        GiphyService.getGifs(offset, searchQuery)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                let newList = []
                if (result && result.data) {
                    if (offset === 0)
                        newList = [...result.data]
                    else
                        newList = this.state.giphyList.concat(...result.data)
                }
                this.setState({ giphyList: newList, isLoading: false })
            })
            .catch((error) => {
                this.setState({ isError: true, isLoading: false })
            })

    }

    delayedGetter = debounce(this.getGipyhs, 500);

    handleScroll = () => {
        window.onscroll = () => {
            if (Math.ceil(window.innerHeight + window.pageYOffset) >= document.body.scrollHeight && this.state.searchQuery) {
                const { offset } = this.state;
                this.setState({
                    offset: offset + 25
                }, () => this.delayedGetGipyhs());
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }


    render() {

        return (
            <div>

                <div className={`search-header ${this.state.darkMode ? "dark" : ""}`}>
                    <div className="search-header-title">
                        <h1>GIFted</h1>
                    </div>

                    <div className="search-header-input">
                        <SearchInput
                            placeholder="Search for a giphy"
                            name="searchQuery"
                            value={this.state.searchQuery}
                            context={this}
                            afterInput={() => {
                                this.delayedGetGipyhs()
                            }}
                        />
                    </div>

                    <div className="search-header-extra">

                        <div className="toggle-container">
                            <div> <SunIcon /> </div>
                            <div className="toggle-container-div">
                                <Toggle isChecked={this.state.darkMode}
                                    onToggle={() => {
                                        this.setState({ darkMode: !this.state.darkMode })
                                    }}
                                />
                            </div>
                            <div> <MoonIcon /> </div>
                        </div>

                    </div>
                </div>



                <div className={`search-result-body ${this.state.darkMode ? "dark" : ""}`}>
                    {
                        this.state.giphyList && this.state.giphyList.map((giphy) =>
                            <GifyView key={giphy.id} giphy={giphy} />
                        )
                    }
                </div>
                {
                    this.state.isLoading && <Loading />
                }
            </div>
        )
    }
}
