import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button,TextField,makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Assignment() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[pathimage,setPathImage]=useState('')
    const[assignments,setAssignments]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const assignment={name,pathimage}
    console.log(assignment)
    fetch("http://localhost:8080/assignment",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(assignment)
      
    }).then(()=>{
      
    console.log("New Assignment added")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/assignment")
  .then(res=>res.json())
  .then((result)=>{
    setAssignments(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Assignment</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Assignment Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Assignment Image" variant="outlined" fullWidth
      value={pathimage}
      onChange={(e)=>setPathImage(e.target.value)}
      />
      <Button variant="contained" color="secondary"  onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Tasks</h1>

    <Paper elevation={3} style={paperStyle}>

      {assignments.map(assignment=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={assignment.id}>
         Id:{assignment.id}<br/>
         Name:{assignment.name}<br/>
         Image:{assignment.pathimage}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}