import React from "react";
import { Card, Divider, Icon, Table, Popconfirm,message,Button} from "antd";
import PropTypes from 'prop-types';





const Data = (props) => {   

const columns = [
  {
    title: "Name",
    dataIndex: "emp_name",
    key: "emp_name",
    render: text => <span className="gx-link">{text}</span>
  },
  {
    title: "Email",
    dataIndex: "emp_email_id",
    key: "emp_email_id"
  },
  {
    title: "Mac",
    dataIndex: "emp_mac_id",
    key: "emp_mac_id"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Button onClick={() => pressedDelete(record.emp_id)}>Delete</Button>
        <Button onClick={() => pressedEdit(record)}>Edit</Button>
        <Button onClick={() => pressedViewInsights(record)}>View Insights</Button>
      </span>
    )
  }
]; 


function pressedDelete(id){
  console.log(id)
  props.delete(id)
}
function pressedEdit(obj) {
  // console.log(id);
  props.edit(obj);
}

function pressedViewInsights(obj){
   props.viewInsights(obj)
}

  const {list,title}  = props;
  return ( 
    <Card title={title}> 
      <Table dataSource={list} columns={columns} rowKey='id' />

    </Card>
  );
}; 





Data.propTypes  = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  delete:PropTypes.func.isRequired
}; 

Data.defaultProps = {
 list:[],
 title:'USER LIST',
 
};
export default Data;
