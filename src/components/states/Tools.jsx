import React from "react";

class Tools extends React.Component {
    render() {
        const {
            children,
            labelValue,
            onAction
        } = this.props;

        const onlyChild = React.Children.only(children);
        let count = React.Children.count(onlyChild.props.children);
        
        return (
            <main style={{margin: "3rem 10rem"}}>
                <div style={{margin: "2rem 0"}}>
                    <select value={labelValue} onChange={onAction} name="status">
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="non-active">Non Active</option>
                    </select>
                </div>
                {children}
                <div>
                    Total {count} items
                </div>
            </main>
        )
    }
}

export default Tools;