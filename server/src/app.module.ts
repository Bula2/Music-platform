import {Module} from "@nestjs/common";
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./files/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path"

@Module({
    controllers: [],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot('mongodb+srv://Bula2:ssppoorrtt58@cluster0.6gexktr.mongodb.net/music-platform?retryWrites=true&w=majority'),
        TrackModule,
        AlbumModule,
        FileModule
    ]
})
export class AppModule{}