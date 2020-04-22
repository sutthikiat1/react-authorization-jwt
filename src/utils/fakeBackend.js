const users = [
  { name: 'user', password: 'user', role: 'member' , token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoibWVtYmVyIn0.9byD_B5uKrW6CTMI2q9uqHL6rx76iFBzHC6DtLOzClM' , success : true , user : 'John Doe'},
  { name: 'admin', password: 'admin', role: 'admin' , token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiYWRtaW4ifQ.OINhRk6ZQWjVHSl8A_j8G-h7futKtqIEukNh5qLwu1E' , success : true , user : 'John Doe' }
]

export const authentication = (name, password) => {
  const user = users.find(u => u.name === name && u.password === password);
  let result = {success : false , token : null};

  if (user) {
    if (user.role === 'member') {
      result = user
    } else if (user.role === 'admin') {
      result = user
    }
  }

  return result
}
