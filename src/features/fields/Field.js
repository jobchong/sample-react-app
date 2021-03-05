import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import styles from './Field.module.css'

import {
  setUser,
  addToProducts,
  removeFromProducts,
  addToTransactions,
  selectName,
  selectProduct,
  selectAllProduct,
  selectTransactions,
} from './fieldsSlice';

export function Field(props) {
  const product = useSelector(selectProduct)
  const allProducts = useSelector(selectAllProduct)
  const name = useSelector(selectName)
  const transactions = useSelector(selectTransactions)
  const dispatch = useDispatch();

  const [username, setName] = useState('')
  const [display, setDisplay] = useState('tiles')

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return(
    <div className={styles.containing}>
      { name != "" &&
        <Grid container justify="flex-end" spacing={2}>
          <Grid xs={2} justify="flex-end">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              {name && `${name}'s`} cart: ${ product.length > 0 ? product.map(a => Number(a.price.amount)).reduce((acc, val) => acc + val) : 0} 
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              onClose={handleClose}>
              {
                product.length > 0 ?
                  product.map((v,i) => {
                    return (
	              <div style={{padding: '0.5em'}}>
	                <img alt='' src={props[v.imagePath]} className={styles.carImage}/>
	                <p className={styles.paragraph}>{v.modelClass}{v.version}</p>
                        <div style={{display: 'inline-block', float: 'right', marginTop: '0.3em', paddingRight: '10px'}}>
                          <Button style={{marginRight: '0.5em'}}variant="contained" color="primary" onClick={()=> dispatch(addToProducts(v))}>
                            +
                          </Button>
                          <Button variant="contained" color="secondary" onClick={()=> dispatch(removeFromProducts(v.modelId))}>
                            -
                          </Button>
                        </div>
	              </div>
                    )
                  }) :
                  <MenuItem>Cart is empty!</MenuItem>
              }
            </Menu>
            <Button variant="contained" color="primary" style={{marginTop: '1em'}} onClick={()=> dispatch(addToTransactions(product))}>
              Pay
            </Button>
          </Grid>
          
        </Grid>
      }
      <Grid container spacing={2} style={{marginTop: '20px'}}>
        {
          name != "" ?
	  <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {allProducts.map((v, i) => (
                <Grid key={i} item xs={4} className={styles.productTile}>
	          <Paper>
	            <img alt='' src={props[v.imagePath]} className={styles.carImage}/>
	            <p className={styles.paragraph}>{v.modelClass}{v.version}</p>
                    <div style={{display: 'inline-block', float: 'right', marginTop: '0.3em', paddingRight: '10px'}}>
                      <Button style={{marginRight: '0.5em'}}variant="contained" color="primary" onClick={()=> dispatch(addToProducts(v))}>
                        +
                      </Button>
                      <Button variant="contained" color="secondary" onClick={()=> dispatch(removeFromProducts(v))}>
                        -
                      </Button>
                    </div>
	          </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          :
	  <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={4} className={styles.loginContainer}>
                <Paper>
                  <h2 className={styles.loginTitle}>Register or log in</h2>
                  <div className={styles.loginWrapper}>
                    <TextField id="user" label="Username" onChange={(e) => setName(e.target.value)}/>
                    <Button style={{marginLeft: '1em', marginTop: '0.8em'}}
                            variant="contained"
                            color="primary"
                            onClick={() => dispatch(setUser(username))}>
                      Go
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    </div>
  )
}
