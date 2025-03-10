
import { Configuration, ModelsDatastore, ModelsDatastoreDB, DataStore , Logger 
	, NoCacheManager,CacheManager} from './';
import { MyAppDelegate } from './appDelegate';
import { UserService } from '../userAccess/UserService';

const dotenv = require('dotenv');
const res = dotenv.config();

const templatesPath = __dirname + '/emailTemplates/';
var configuration = new Configuration(
	{
		definitionsPath: process.env.DEFINITIONS_PATH,
		templatesPath: templatesPath,
		timers: {
			//forceTimersDelay: 1000, 
			precision: 3000,
		},
		database: {
			MongoDB:
			{
				db_url: process.env.MONGO_DB_URL  //"mongodb://localhost:27017?retryWrites=true&w=majority",
			}
		},
		apiKey: process.env.API_KEY,
		/* Define Server Services */
		logger: function (server) {
			new Logger(server);
		},
		definitions: function (server) {
			return new ModelsDatastore(server);
		},
		appDelegate: function (server) {
			return new MyAppDelegate(server);
		},
		dataStore: function (server) {
			let ds=new DataStore(server);
			ds.enableSavePoints=false;
			return ds;
		},
		cacheManager: function (server) {
			return new NoCacheManager(server);
		},
		userService: function (server) {
			return new UserService(server);
		}
		
	});


export { configuration}