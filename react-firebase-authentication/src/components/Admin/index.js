import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: false,
        users: [],
      };
    }
  
    componentDidMount() {
      this.setState({ loading: true });
      console.log("hello", "hello")
      // this.props.firebase.users().on('value', snapshot => {
      //   const usersObject = snapshot.val();

      //   const usersList = Object.keys(usersObject).map(key => ({
      //     ...usersObject[key],
      //     uid: key,
      //   }));
  
      //   this.setState({
      //     users: usersList,
      //     loading: false,
      //   });
      // });  
      
      this.props.firebase.users()
        .get()
        .then(snapshot => {
          const usersList = []
          snapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", doc.data())
            // usersList[doc.id] = doc.data()
            // const usersObject = doc.data();
            // usersList[doc.id] = Object.keys(usersObject).map(key => ({
            //       ...usersObject[key],
            //       uid: key,
            //     }));
            // alert(usersList[doc.id].email)
            usersList[usersList.length] = {
              uid: doc.id,
              email: doc.data().email,
              username: doc.data().username
            }
          })
          this.setState({
            users: usersList,
            loading: false,
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }
  
    componentWillUnmount() {
        //this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;
      
        return (
        <div>
            <h1>Admin</h1>

            {loading && <div>Loading ...</div>}

            <UserList users={users} />
        </div>
      );
    }
  }

  const UserList = ({ users }) => (
    <ul><h1>{users.length}</h1>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid} |
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email} |
          </span>
          <span>
            <strong>Username:</strong> {user.username} 
          </span>
        </li>
      ))}
    </ul>
  );
  
  
  export default withFirebase(AdminPage);
