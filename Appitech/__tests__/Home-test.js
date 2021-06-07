/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import Home from '../src/home/Home';
 import { SearchBar, Overlay } from 'react-native-elements';
 import {shallow} from 'enzyme';
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
import SearchBarHome from '../src/home/searchBar/searchBar';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

 it('Render Home', () => {
   const tree = renderer.create(<Home/>).toJSON();
   expect(tree).toMatchSnapshot();
 })

 describe("Search Bar", () => {
  it('Search is functionnal', () => {
    const wrapper = shallow(<SearchBarHome search="Epicture Test"/>);
    const instance = wrapper.instance();
    var test = wrapper.find(SearchBar);
    test.simulate('keypress', {key: 'Enter'});
    wrapper.update();
    expect(test.props().value).toEqual("Epicture Test");
  });
});