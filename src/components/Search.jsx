import React, { Component } from 'react'
import { GiphyService } from '../service/GiphyService';
import Loading from './common/Loading';
import SearchInput from './common/SearchInput';

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
                </div>
            </div>
        )
    }
}
