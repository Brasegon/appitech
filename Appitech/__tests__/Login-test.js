/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import Home from '../src/home/Home';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 import Login from '../src/login/login';
 
 it('Render Login', () => {
   const tree = renderer.create(<Login/>).toJSON();
   expect(tree).toMatchSnapshot();
 })