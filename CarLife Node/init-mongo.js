db.createUser(
  {
    user : "carlife",
    pwd  : "somerandompasswd",
    roles: [
      {
         role : "readWrite",
	 db   : "carlifedb"
      }
    ]
  }
)
