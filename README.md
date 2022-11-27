## Token ATM front project front end


- This is a capstone project for UCI MSWE program. The project is designed to help TAs and professors better manage the token and for students to better use the token.
- The system is developed separately between the front-end and back-end.
### Environment setup
- The front-end is developed base on the open-source project [renren-fast-vue](https://github.com/renrenio/renren-fast-vue), renren-fast-vue has its back-end [renren-fast](https://gitee.com/renrenio/renren-fast), and it has been integrated into our back-end project as a module.
- To start the front-end, the back-end should be started first, you have to have mysql(>=5.6) installed and change the db name, username and password in the application-dev.yml in back-end project. After the back-end service started, make sure have node installed(>=10) and then go to the work directory of renren-fast-vue run the following commands:
    npm install
    npm run dev

