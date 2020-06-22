const fs = require('fs');
const Graph = require('../DataScructures/Graph');
const djikstraAlgorithm = require('../Algorithms/djikstraAlgorithm');

const mongoose = require('mongoose');

const Stretch = mongoose.model('Stretch');
const City = mongoose.model('City');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const stretches = await Stretch.paginate({}, { page, limit: 10 });
        return res.json(stretches);
    },

    async store(req, res) {
        let imageData = fs.readFileSync(req.file.path, 'utf8');
        let text = imageData.toString();
        let lines = text.split("\r\n");

        await Stretch.remove({});

        setStretch = async (stretch) => {
            return await Stretch.create(stretch);
        }

        let result = lines.map(async item => {
            let sStretch = item.split(' ');
            let stretch = {
                source: sStretch[0],
                target: sStretch[1],
                size: Number(sStretch[2]),
            };
            const stretch_res = await setStretch(stretch);
            return stretch_res;
        });

        return res.status(201).json(await Promise.all(result));
    },

    async posts(req, res) {
        let imageData = fs.readFileSync(req.file.path, 'utf8');
        let text = imageData.toString();
        let lines = text.split("\r\n");

        const cities = await City.find();
        const stretches = await Stretch.find();

        let posts = lines.map(item => {
            let sPost = item.split(' ');
            let post = {
                source: sPost[0],
                target: sPost[1],
            };
            return post;
        });

        let g = new Graph();
        cities.forEach(val => {
            g.addNode(val.acronym);
        });
        stretches.forEach(val => {
            g.addDirectedEdge(val.source, val.target, val.size);
        });
        let results = posts.map(p => {
            const { distances, path, pathToTarget } = djikstraAlgorithm(g, p.source, p.target);
            // console.log(distances);
            // console.log(`${p.source} <-> ${p.target}`);
            // console.log(pathToTarget.join(' -> '), distances.get(p.target));
            // console.log(path.join(' -> '));
            // console.log('-----------------------')
            return pathToTarget.join(' ') + ' ' + distances.get(p.target);
        });
        let strFile = results.join("\r\n")
        res.setHeader('Content-disposition', 'attachment; filename=route.txt');
        res.setHeader('Content-type', 'text/plain');
        res.charset = 'UTF-8';
        res.write(strFile);
        res.end();

        //return res.json(stretches);
    },
}
