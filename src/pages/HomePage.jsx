import React from "react";
import States from '../components/states/states';
import Tools from '../components/states/Tools';
import SimpleList from '../components/states/SimpleList';

const Mycontext = React.createContext();

let arr = [
  {
    id: 1,
    title: "October",
    desc: "patient came",
    isActive: false
  },
  {
    id: 2,
    title: "November",
    desc: "patient came",
    isActive: true
  },
  {
    id: 3,
    title: "December",
    desc: "patient came",
    isActive: false
  }
];

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: arr,
            activeState: "all",
            showLabel: true
        };
    }

    onListChange = (evnt) => {
        const value = evnt.target.value;
        
        this.setState({
            activeState: value
        });
    }

    handleDelete = (item) => {
        const newList = this.state.data.filter((element) => element.id !== item.id);

        this.setState({
            data: newList
        });
    }

    handleLabelClick = (arg) => {
        this.setState({
            activeState: arg
        });
    }

    handleShowLabel = (evnt) => {
        this.setState({
            showLabel: evnt.target.checked
        });
    }
    
    render() {
        
        const {
            data,
            activeState
        } = this.state;

        const newList = this.state.data.filter((item) => {
            if (activeState === "all") { 
                return true;
            }
            if (activeState === "active") {
                return item.isActive === true;
            }
            if (activeState === "non-active") {
                return item.isActive === false;
            }
            return false;
        });

        return(
            <>
                <div style={{margin: "2rem"}}>
                    <input checked={this.state.showLabel} onChange={this.handleShowLabel} type="checkbox"></input>Show Label
                </div>
                <Mycontext.Provider value={this.state.showLabel}>
                    <Tools labelValue={activeState} onAction={this.onListChange}>
                        <SimpleList data={newList} onAction={this.handleDelete} onLabelClick={this.handleLabelClick} />
                    </Tools>
                </Mycontext.Provider>
            </>
        )        
    }
} 

export default HomePage;

export {
    Mycontext
}
