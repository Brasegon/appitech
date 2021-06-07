/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import Home from '../src/home/Home';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 import Upload from '../src/home/Upload/Upload';
 
 it('Render Upload', () => {
   const tree = renderer.create(<Upload/>).toJSON();
   expect(tree).toMatchSnapshot();
 })