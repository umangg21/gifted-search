import React, { Component } from 'react'
import { GiphyService } from '../service/GiphyService';
import Loading from './common/Loading';
import SearchInput from './common/SearchInput';
import GifyView from './GifyView';

export default class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchQuery: "",
            offset: 0,
            giphyList: [],
            isLoading: false,
            isError: false,
        }
    }

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

    handleScroll = () => {
        window.onscroll = () => {
            if (Math.ceil(window.innerHeight + window.pageYOffset) >= document.body.scrollHeight && this.state.searchQuery) {
                const { offset } = this.state;
                this.setState({
                    offset: offset + 25
                }, () => this.getGipyhs());
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }


    render() {

        return (
            <div>

                <div className="search-header">
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
                                this.getGipyhs()
                            }}
                        />
                    </div>

                    <div className="seacrh-header-extraa">

                    </div>
                </div>

                {
                    this.state.isLoading && <Loading />
                }

                <div className="search-result-body">
                    {
                        this.state.giphyList && this.state.giphyList.map((giphy) =>
                            <GifyView key={giphy.id} giphy={giphy} />
                        )
                    }
                </div>
            </div>
        )
    }
}
